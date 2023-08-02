import { Budget, type SingleLineBudget } from './Budget'
import { Emitter, EventType } from 'mitt'
import { Events, eventbus } from '../eventBus'
import { Team, TeamMember } from './Team'
import { Offsite } from './Offsite'
import axios from 'axios'

const CLIENT_ID = 'kbTFPlyzFvrDKpY7Q923QPBDZIyG13aX'
const CLIENT_SECRET = 'n4ZILmYY7TCd0uhw'

interface AmadeusToken {
  access_token: string
}

interface Price {
  currency: string
  total: string
}

interface FlightDetail {
  price: Price
}

interface FlightData {
  data: FlightDetail[]
}

export default class Calculator {
  constructor(private eventBus: Emitter<Record<EventType, unknown>>) {}

  async computeBudgetForMember(
    auth: AmadeusToken,
    member: TeamMember,
    offsite: Offsite
  ): Promise<number> {
    const originLocationCode = member.closestAirport
    const destinationLocationCode = offsite.closestAirport

    if (originLocationCode == destinationLocationCode) return 0

    const payload = {
      currencyCode: 'EUR',
      originDestinations: [
        {
          id: '1',
          originLocationCode: originLocationCode,
          destinationLocationCode: destinationLocationCode,
          departureDateTimeRange: {
            date: '2023-10-17',
            time: '10:00:00',
            dateWindow: 'P1D'
          }
        }
      ],
      travelers: [
        {
          id: '1',
          travelerType: 'ADULT'
        }
      ],
      sources: ['GDS'],
      searchCriteria: {
        maxFlightOffers: 2,
        flightFilters: {
          busSegmentAllowed: true,
          cabinRestrictions: []
        }
      }
    }

    const flights = await axios.post(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      payload,
      {
        headers: {
          Authorization: `Bearer ${auth.access_token}`
        }
      }
    )

    const flightData = (flights.data as FlightData).data

    if (flightData.length == 0) {
      eventbus.emit(Events.error, {origin: originLocationCode, target: destinationLocationCode})
      return 0;
    }
    const sum = flightData.map((f) => Number(f.price.total)).reduce((acc, val) => acc + val, 0)

    const avg = sum / flightData.length

    const singleLine: SingleLineBudget = {
      budget: avg,
      offsite: offsite,
      member: member
    }
    eventbus.emit(Events.calc_new_line_budget, singleLine)

    return avg
  }

  async compute(team: Team, offsites: Offsite[]) {
    try {
      this.eventBus.emit(Events.calc_started, null)
      try {
        const params = new URLSearchParams()
        params.append('client_id', CLIENT_ID)
        params.append('client_secret', CLIENT_SECRET)
        params.append('grant_type', 'client_credentials')

        // Make a request for a user with a given ID

        /**
         
        {
            "type": "amadeusOAuth2Token",
            "username": "sleroy@byoskill.com",
            "application_name": "whereismynextoffsite",
            "client_id": "kbTFPlyzFvrDKpY7Q923QPBDZIyG13aX",
            "token_type": "Bearer",
            "access_token": "KONssY7N6JgrOumGwSAGkJUpoF0K",
            "expires_in": 1799,
            "state": "approved",
            "scope": ""
        }
        
         */
        const auth = await axios.post(
          'https://test.api.amadeus.com/v1/security/oauth2/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        const authDetails = auth.data as AmadeusToken

        for (let offsite of offsites) {
          let totalBudget = 0
          for (let member of team.members) {
            totalBudget +=
              member.staff * (await this.computeBudgetForMember(authDetails, member, offsite))
          }

          const budget: Budget = {
            offsite: offsite,
            budget: totalBudget
          }

          eventbus.emit(Events.calc_new_offsite, budget)
        }
      } catch (e) {
        console.error(e)
      }
    } finally {
      this.eventBus.emit(Events.calc_terminated, null)
    }
  }
}

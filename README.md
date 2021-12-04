# StashAway Deposit Plan

## Overview

Handle input of both one-time and monthly deposit plans as well as a list of fund deposits, that returns the allocation of funds amongst the customer’s portfolios.

## Installation

* `git clone https://github.com/kinglarce/stashaway.git`
* `cd stashaway`
* `npm install`
* `npm build && npm start`

## Links

* Local Installation : `http://localhost:8000/`
* Replit Instance : `https://stashaway.kinglarce.repl.co`
  * Example: `https://stashaway.kinglarce.repl.co/docs`

## API Endpoints

#### `/docs`
URL: [https://stashaway.kinglarce.repl.co/docs](https://stashaway.kinglarce.repl.co/docs)

Swagger API UI for testing the available API's.

#### `POST /deposit-plan`
URL: [https://stashaway.kinglarce.repl.co/deposit-plan](https://stashaway.kinglarce.repl.co/docs/#/default/CreateDepositPlan)

This will save the deposit plan and return the list of deposit funds.

Example Request

```json
// Input One
{
  "refId": "JMSBOND007",
  "portfolioType": "High Risk", // Either "High Risk" or "Retirement"
  "planType": "One Time", // Either "One Time" or "Monthly"
  "amount": 10000
}

// Input Two
{
  "refId": "JMSBOND007",
  "portfolioType": "High Risk", // Either "High Risk" or "Retirement"
  "planType": "Monthly", // Either "One Time" or "Monthly"
  "amount": 0
}
```

Example Response

```json
{
  "JMSBOND007": [
    {
      "portfolioType": "High Risk",
      "plans": [
        {
          "planType": "One Time",
          "amount": 10000
        },
        {
          "planType": "Monthly",
          "amount": 0
        }
      ]
    }
  ]
}
```

#### `GET /deposit-plan/{refId}`
URL: [https://stashaway.kinglarce.repl.co/deposit-plan/{refId}](https://stashaway.kinglarce.repl.co/docs/#/default/GetDepositPlan)

This will retrieve the list of deposit funds.

Example Request

`https://stashaway.kinglarce.repl.co/deposit-plan/JMSBOND007`

Example Response

```json
{
  "JMSBOND007": [
    {
      "portfolioType": "High Risk",
      "plans": [
        {
          "planType": "One Time",
          "amount": 10000
        },
        {
          "planType": "Monthly",
          "amount": 0
        }
      ]
    }
  ]
}
```

#### `GET /allocation-fund/{refId}`
URL: [https://stashaway.kinglarce.repl.co/allocation-fund/{refId}](https://stashaway.kinglarce.repl.co/docs/#/default/GetAllocationFund)

This will retrieve the allocation funds amongst the customer's profile.

Example Request

`https://stashaway.kinglarce.repl.co/allocation-fund/JMSBOND007`

Example Response

```json
[
  {
    portfolioType: "High Risk",
    totalAmount: 10000,
  },
  {
    portfolioType: "Retirement",
    totalAmount: 600,
  },
]
```

#### `GET /deposit-fund/{refId}`
URL: [https://stashaway.kinglarce.repl.co/deposit-fund/{refId}](https://stashaway.kinglarce.repl.co/docs/#/default/GetDepositFund)

This will retrieve a list of fund deposits.

Example Request

`https://stashaway.kinglarce.repl.co/deposit-fund/JMSBOND007`

Example Response

```json
[
  {
    planType: "One Time",
    totalAmount: 10500,
  },
  {
    planType: "Monthly",
    totalAmount: 100,
  },
]
```

More info on the logic input/output and data structure under `src/services/*.test.ts` files.

## Feedback
Thank for the assignment and please give me a feedback by emailing me at `hello@kinglarce.com`. Have a great day!
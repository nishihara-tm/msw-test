import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3000/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: 1,
            name: 'tanaka'
          },
          {
            id: 2,
            name: 'satoshi'
          }
        ] 
      })
    )
  })
]

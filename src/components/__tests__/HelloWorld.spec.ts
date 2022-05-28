import HelloWorld from "../HelloWorld.vue";
import { server } from "../../mocks/server";
import { getByText, render, screen } from "@testing-library/vue";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockServer = setupServer(
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
)


describe("HelloWorld.vue", () => {

  beforeAll(() => {
    server.listen()
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("Hello worldが表示される", async() => {
    const view = render(HelloWorld)
    const elm = screen.getByText("Hello World");
    screen.debug(elm)
    expect(elm).toBeInTheDocument()
  })

  it("person name", async() => {
    const view = render(HelloWorld)
    expect(await view.findAllByText('tanaka')).toBeTruthy()
  })
});


import HelloWorld from "../HelloWorld.vue";
import { server } from "../../mocks/server";
import { render, screen } from "@testing-library/vue";
import axios from 'axios';
import { fireEvent } from "@testing-library/dom";

describe("HelloWorld.vue", () => {

  beforeAll(() => {
    server.listen()
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("Hello worldが表示される", async() => {
    const view = render(HelloWorld, { props: {msg: "test!"} })
    const elm = screen.getByText("Hello World");
    screen.debug(elm)
    expect(elm).toBeInTheDocument()

    const msg = screen.getByText("test!")
    screen.debug(msg)
    expect(msg).toBeInTheDocument()
  })

  it("person name", async() => {
    const view = render(HelloWorld)
    expect(await view.findAllByText('tanaka')).toBeTruthy()
  })

  it("test axios", async () => {
    const res = await axios.get('http://localhost:3000/users')
    const names = res.data.users.map((user: any) => user.name)
    expect(names).toEqual(["tanaka", "satoshi"])
  })

  it("click button to increase", async() => {
    const view = render(HelloWorld)
    const button = screen.getByText("increment")
    await fireEvent.click(button)
    await fireEvent.click(button)

    const elm = screen.getByText("count is: 2")
    expect(elm).toBeInTheDocument()
  })
});


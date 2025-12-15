import {screen , render} from "@testing-library/react"
import Login from "./Login"

describe("Test component Login",()=>{
    it("Test user name",()=>{
        render(<Login/>)
        const element=screen.getByLabelText("firstName")
        expect(element).toBeInTheDocument()
    })
    it("Test user last name",()=>{
        render(<Login/>)
        const element=screen.getByLabelText("lastName")
        expect(element).toBeInTheDocument()
    })
      it("Test user email",()=>{
        render(<Login/>)
        const element=screen.getByLabelText("email")
        expect(element).toBeInTheDocument()
    })

     it("Test user password",()=>{
        render(<Login/>)
        const element=screen.getByLabelText("password")
        expect(element).toBeInTheDocument()
    })

})
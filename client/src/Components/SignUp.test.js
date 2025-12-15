import {screen , render} from "@testing-library/react"
import SignUp from "./SignUp"

describe("Test component SignUp",()=>{
      it("Test user first-name",()=>{
        render(<SignUp />)
        const element=screen.getByLabelText('fname')
        expect(element).toBeInTheDocument()
    })
     it("Test user last-name",()=>{
        render(<SignUp />)
        const element=screen.getByLabelText('lname')
        expect(element).toBeInTheDocument()
    })
     it("Test user first-name",()=>{
        render(<SignUp />)
        const element=screen.getByLabelText('email')
        expect(element).toBeInTheDocument()
    })
     it("Test user password",()=>{
        render(<SignUp />)
        const element=screen.getByLabelText('password')
        expect(element).toBeInTheDocument()
    })

})
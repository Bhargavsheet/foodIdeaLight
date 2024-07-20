import React from "react"
import Container from 'react-bootstrap/Container';


function Footer (){
    let currentYear = new Date().getFullYear()

    return(
        <div className="bg-body-tertiary text-center ">
            <Container>
                <footer className="page-footer font-small blue pt-4">
                    <div className="footer-copyright py-3">
                        © {currentYear} Copyright : FoodIdeaLight
                    </div>
                </footer>
            </Container>
        </div>
    )
}
export default Footer
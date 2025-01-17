workspace extends ../workspace.dsl  {

    model {
        browser = softwareSystem "Browser" {
            tags browser
            description "Any browser used to access the internet"
        }
        webservice = softwareSystem "Web Service" {
            description "a computer providing web services"
        }
        browser -> pDNS
        browser -> firewall
        firewall -> webservice
    }

    views {

        dynamic iDNS {
            title  "Accessing Web Services with a Browser"

            browser -> pDNS "go to nesofia.tech"
            pDNS -> browser "return IP address of 42.42.42.42"

            browser -> firewall "ask 42.42.42.42 for website service"

            firewall -> webservice "forward request to web service"
            webservice -> firewall "web service returns request"

            firewall -> browser "send request back to browser"
        }

        styles {
            element "browser" {
                shape webbrowser
            }
        }
    }    
}
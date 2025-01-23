workspace extends ../workspace.dsl  {

    model {
        uglySweaterEmployee = person "Ugly Sweater Employee" {

        }

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


        uglySweaterEmployee -> EvidenceAggregationService
        EvidenceAggregationService -> webservice
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

        dynamic iDNS {
            title  "Using The Policy Tools"

            uglySweaterEmployee -> EvidenceAggregationService "fill in company info (config forms)"
            uglySweaterEmployee -> EvidenceAggregationService "manually start validation process (button)"
            EvidenceAggregationService -> webservice "Gather evidence from service endpoints based on configuration"
            EvidenceAggregationService -> policyValidationService "pass evidence results to validation service and store validation result"
            EvidenceAggregationService -> uglySweaterEmployee "generate actionable reports"
            uglySweaterEmployee -> EvidenceAggregationService "rerun validation process after making systems compliant"
        }

        styles {
            element "browser" {
                shape webbrowser
            }
        }
    }    
}
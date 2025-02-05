workspace extends ../workspace.dsl  {

    model {
        clientComplianceStaff = person "Client Compliance Staff" {
            description "responsible for ensuring that the company operates in a compliant manner."
        }

        clientITStaff = person "Client IT Staff" {
            description "responsible for administrating IT systems"
        }

        browser = softwareSystem "Browser" {
            tags browser
            description "Any browser used to access the internet"
        }

        webservice = softwareSystem "Client Web Service" {
            description "one of many systems that provide a client with services"
        }

        companyTrackingService = softwareSystem "Company Tracking Web Site" {
            description "Where clients go to sign up for Neosofia services and track their compliance status. Self hosted model is also supported for on-premises installations."
        }

        browser -> pDNS
        browser -> firewall
        firewall -> webservice

        CompanyTrackingService -> EvidenceAggregationService 
        clientComplianceStaff -> companyTrackingService
        clientITStaff -> companyTrackingService
        EvidenceAggregationService -> webservice
    }

    views {

        dynamic iDNS {
            title  "Accessing Web Services with a Browser"

            browser -> pDNS "go to neosofia.tech"
            pDNS -> browser "return IP address of 42.42.42.42"

            browser -> firewall "ask 42.42.42.42 for website service"

            firewall -> webservice "forward request to web service"
            webservice -> firewall "web service returns request"

            firewall -> browser "send request back to browser"
        }

        dynamic iDNS {
            title  "Using The Policy Tools"

            clientComplianceStaff -> companyTrackingService "Signs up for Neosofia services by filling in general company info like industry, sub-industry, and company size"


            clientITStaff -> companyTrackingService "fill in additional technical information that points to the services that need to be validated. User is guided based on general company info"

            clientComplianceStaff -> companyTrackingService "manually start validation process (button)"
            CompanyTrackingService -> EvidenceAggregationService "initiates evidence gathering process"
            EvidenceAggregationService -> webservice "Gather evidence from service endpoints based on configuration"
            EvidenceAggregationService -> policyValidationService "pass evidence results to validation service and store validation result"
            CompanyTrackingService -> clientComplianceStaff "generate actionable reports"
            clientITStaff -> CompanyTrackingService "act on reports and rerun validation process"
            clientComplianceStaff -> CompanyTrackingService "act on reports and rerun validation process"
        }

        styles {
            element "browser" {
                shape webbrowser
            }
        }
    }    
}
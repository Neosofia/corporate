workspace "Compliant Work Environment" {
    description "Overview of what a compliant system would look like that employees can work and host from."

    !identifiers hierarchical
    !impliedRelationships false
    !adrs adrs
    
    model {
        properties {
            "structurizr.groupSeparator" "/"
        }

        #
        # People
        #
        employee = person "Employee" {
            description "Somebody who works for the company and needs a compliant place to get their job done."
        }

        customer = person "Customer" {
            description "The people who pay you to provide a service."
        }

        externalContributor = person "External Contributor" {
            description "Somebody who does not work for the company and makes contributions to company products."
        }

        #
        # Software
        # 
        eas = group "Enterprise Application Services (EAS)" {
            #description "Computer software used to satisfy the needs of an organization rather than its individual users."

            group "Third Party EAS (3W)" {
                CA = softwareSystem "Certificate Authority" {
                    description "issues SSL certificates to encryption communications between computer systems"
                }

                pDNS = softwareSystem "Public Domain Name Service (DNS)" {
                    description "Public authority for DNS records"
                }

                SCCS = softwareSystem "Source Code Control System (SCCS)" {
                    description ""
                }
            }

            group "Self-Hosted EAS (SW)" {
                workstation = softwareSystem "Workstation (controlled)" {
                    description "A compliant environment where employees do work and the company is run."
    
                    perspectives {
                        "Regulation" "In general, to comply with multiple international regulations, the employee workstation must only allow them to do the job functions they are assigned, qualified, and trained to do."
                        "Risk" "High: Data compromise (loss) is one of the most common issues that regulatory authorities expect to be mitigated against. Data loss will be ensured by 1) disallowing data to be exported from the workstation 2) keeping software systems up to date to minimize the chance of external attacks 3) only be accessible through a managed firewall and 4) encrypting everything at rest should the device be lost/stollen."
                    }
                }
    
                virtualization = softwareSystem "Virtualization" {
                    description "A series of technologies that allows dividing of physical computing resources into a series of virtual machines, operating systems, processes or containers."
                }

                authentication = softwareSystem "Authentication" {
                    description "Gotta log in somewhere"
    
                    perspectives {
                        "Regulation" "Most regulations require that you authenticate before working on any system or access private data."
                        "Risk" "High"
                    }
                }
    
    
    
                iDNS = softwareSystem "Internal Domain Name Service (DNS)" {
                    description "System Responsible for translating domain names into machine IP addresses "
    
                    perspectives {
                        "Regulation" "DNS is frequently exploited and must be..."
                        "Risk" "High"
                    }
                }
    
                persistentDataStorageSystem = softwareSystem "Persistent Data Storage Service" {
                    description "A persistent data storage service that may store files, relational data, or key/value information"
                    tags "database"
    
                    perspectives {
                        "Regulation" "Most regulations require that you have data backup procedures in place and that they're tested based on various disaster scenarios. Some regulations require that you retain data for over 30 years!"
                        "Risk" "High: Data that is persisted can be subject to attack/exfiltration/manipulation from hackers and can also  "
                    }
                }
    
                firewall = softwareSystem "Firewall" {
                    description "Controls network communications between software systems."
    
                    perspectives {
                        "Regulation" "Most regulations require that your firewalls follow the principle of least privilege and that everything is encrypted in flight"
                        "Risk" "High: Anything that is exposed to another system is subject to attack. All firewall configurations will follow the principle of least privilege and ensure "
                    }
                }
            }
        }

        group "Neosofia Open Source Products" {
            policyValidationService = softwareSystem "Neosofia Policy Validation Service" {
                description "A web service that validates regulatory compliance"

                perspectives {
                    "Regulation" "Depending on the industry, computer systems validation (CSV) may need to be followed to develop this service."
                    "Risk" "Medium: Incorrectly implemented policy rules could lead to false assumption by organizations and result in material damages. Policy rules must authored, reviewed and approved by authorized individuals that are qualified based on their CV."
                }
            }

            EvidenceAggregationService = softwareSystem "Neosofia Evidence Aggregation Service" {
                description "A web service to gather data from compliant systems that is then passed into the policy service for validation."

                perspectives {
                    "Regulation" "Depending on the industry, computer systems validation (CSV) may need to be followed to develop this service."
                    "Risk" "High: In order to programmatically gather data from our systems, API keys and tokens must be passed into the service. All secrets must be treated as ephemeral data that only persists for the duration of the web service request and is not persisted in log files, memory, file systems etc."
                }
            }
        }

        uncontrolledWorkstation = softwareSystem "Workstation (uncontrolled)" {
            description "A workstation your company does not control."
            perspectives {
                "Regulation" "Some regulations (ICH E6 (R2) aka GCP) require that any user of the system must be trained before using it."
            }
        }

        employee -> workstation "Do your job with all the tools you need to get it done"
        workstation -> firewall "All roads to do your job go through a firewall"
        workstation -> iDNS "Gotta know which IP address to go to before you can go through a FW"
        virtualization -> ca "Register certificates"
        iDNS -> pDNS "If a DNS query can't be resolved internally, go to public DNS records"
        firewall -> authentication "Authenticate the user trying to do their job"
        firewall -> persistentDataStorageSystem "Save Employee work"
        firewall -> EvidenceAggregationService
        EvidenceAggregationService -> policyValidationService

        customer -> uncontrolledWorkstation
        externalContributor -> uncontrolledWorkstation


        uncontrolledWorkstation -> firewall "External individuals access non-corporate services through a firewall."

        production = deploymentEnvironment "Production" {

            ws1 = deploymentNode "Employee Workstation/Server 1" {
                technology "Beelink EQ12 with N100"

                deploymentNode "Virtualization" {
                    technology "Proxmox"
                    description "Where we run all of our VMs"

                    deploymentNode "Desktop" {
                        technology "Windows / Unix / Mac OS"
                        softwareSystemInstance workstation
                    }
                    deploymentNode "Firewall" {
                        technology "OPNSense"
                        softwareSystemInstance firewall
                    }
                    deploymentNode "DNS" {
                        technology "pi-hole"
                        softwareSystemInstance iDNS
                    }
                    deploymentNode "NAS" {
                        technology "True NAS"
                        softwareSystemInstance persistentDataStorageSystem
                    }
                    deploymentNode "Containerization" {
                        technology "Ubuntu / Docker"
                        softwareSystemInstance policyValidationService
                        softwareSystemInstance EvidenceAggregationService
                    }
                    deploymentNode "Identity Provider" {
                        technology "Authentik"
                        softwareSystemInstance authentication
                    }
                }

            }
            dpDNS = deploymentNode "Public DNS" {
                technology "CloudFlare"
                softwareSystemInstance pDNS
            }
            dca = deploymentNode "CA" {
                technology "Let's Encrypt"
                softwareSystemInstance ca
            }
        }     
    }

    views {
        properties {
            "structurizr.sort" "created"
        }
        systemLandscape workenvironment {
            include *
            autolayout tb
        }

        deployment * production {
            include *
            autolayout tb
        }
     
        styles {


            element "Element" {
                background #0D4884
            }
            element "Person" {
                background #9b0303
                color #ffffff
                shape person
            }
            element "Software System" {
                color #ffffff
            }
            element "Infrastructure Node" {
                color #ffffff    
            }
            element "database" {
                shape cylinder
            }
            element "procedure" {
                shape hexagon
            }
        }
    }



}
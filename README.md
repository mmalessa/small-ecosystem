# Small Ecosystem

Demo of a small ecosystem

## Work in progress...

## Architecture

```mermaid
flowchart LR
    subgraph Proxy
        TR[Traefik :80]
    end

    subgraph Keycloak
        KC[Keycloak :8080]
        PG[(PostgreSQL :5432\nkeycloak DB\nwal_level=logical)]
        KC -- writes --> PG
    end

    subgraph Admin
        ADM[Adminer :8080]
        ADM -- manages --> PG
    end

    subgraph API["API Gateway"]
        KD[KrakenD :8080]
        ECHO[Echo Service\nnginx stub]
        DEMO[Demo Service\ngo-dummy-http]
        KD -- "X-User-* headers" --> ECHO
        KD -- "X-User-* headers" --> DEMO
        KD -- "JWKS validation" --> KC
    end

    subgraph CDC["Change Data Capture"]
        DBZ[Debezium Server :2.6\npgoutput plugin\nslot: debezium]
        PG -- replication slot\npublic.user_entity --> DBZ
    end

    subgraph Messaging
        RP[Redpanda :9092]
        TOPIC[[topic:\nkeycloak.public.user_entity]]
        CON[Redpanda Console :8080]
        DBZ -- produce --> RP
        RP --> TOPIC
        CON -- browse --> RP
    end

    subgraph Frontend
        FE[Angular SPA :4200]
        FE -- "POST /token" --> KC
        FE -- "GET /api/echo + Bearer" --> KD
        FE -- "GET /api/demo + Bearer" --> KD
    end

    TR -- frontend.localhost --> FE
    TR -- keycloak.localhost --> KC
    TR -- console.localhost --> CON
    TR -- adminer.localhost --> ADM
    TR -- api.localhost --> KD
```

### CDC Event fields

Debezium emits events on `keycloak.public.user_entity` topic. Each message contains only:

| Field      | Description          |
|------------|----------------------|
| `id`       | Keycloak user UUID   |
| `username` | Username             |
| `email`    | Email address        |
| `enabled`  | Account active flag  |
| `__op`     | Operation: `c` create / `u` update / `d` delete |

## Services

| Service          | URL / port                          | Credentials                | Database  |
|------------------|-------------------------------------|----------------------------|-----------|
| Traefik          | http://localhost (reverse proxy)    |                            |           |
| Frontend         | http://frontend.localhost            |                            |           |
| KrakenD          | http://api.localhost                |                            |           |
| Echo Service     | (internal) via KrakenD `/api/echo`  |                            |           |
| Demo Service     | (internal) via KrakenD `/api/demo`  |                            |           |
| Keycloak         | http://keycloak.localhost           | admin / admin              |           |
| Adminer          | http://adminer.localhost            |                            |           |
| Redpanda Console | http://console.localhost            |                            |           |
| Redpanda (Kafka) | localhost:9092                      |                            |           |
| PostgreSQL       | localhost:5432                      | admin / admin (superuser)  | -         |
| PostgreSQL       | localhost:5432                      | keycloak / keycloak        | keycloak  |

Traefik routes HTTP traffic on port 80 based on subdomains. Keycloak and Redpanda Console are not exposed on separate ports — access them through Traefik.
## Usage

```bash
make up    # start all services
make down  # stop all services
```

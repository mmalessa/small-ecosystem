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

    TR -- keycloak.localhost --> KC
    TR -- console.localhost --> CON
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

| Service          | URL / port                          | Credentials   |
|------------------|-------------------------------------|---------------|
| Traefik          | http://localhost (reverse proxy)    |               |
| Keycloak         | http://keycloak.localhost           | admin / admin |
| Redpanda Console | http://console.localhost            |               |
| Redpanda (Kafka) | localhost:9092                      |               |
| PostgreSQL       | localhost:5432                      |               |

Traefik routes HTTP traffic on port 80 based on subdomains. Keycloak and Redpanda Console are not exposed on separate ports — access them through Traefik.
## Usage

```bash
make up    # start all services
make down  # stop all services
```

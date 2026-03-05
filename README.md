# Small Ecosystem

Demo of a small ecosystem

## Work in progress...

## Architecture

```mermaid
flowchart LR
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
        CON[Redpanda Console :8081]
        DBZ -- produce --> RP
        RP --> TOPIC
        CON -- browse --> RP
    end
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

| Service          | URL / port        |
|------------------|-------------------|
| Keycloak         | http://localhost:8080 |
| Redpanda Console | http://localhost:8081 |
| Redpanda (Kafka) | localhost:9092    |
| PostgreSQL       | localhost:5432    |

Keycloak credentials: admin/admin
## Usage

```bash
make up    # start all services
make down  # stop all services
```

# azimuth-service-layer

## What is this for?
1. Transform incoming parameters from the application (true/false = 'Y'/'N')
2. Add any executing user Id (sharing) to the request
3. Transform outgoing responses from the datalayer (any[][]) into a typed response
4. Transform data from the database to the api ('Y'/'N' = true/false)

## What does this need to accomplish this?
1. A way to convert true/false into 'Y'/'N'
2. A way to convert 'Y'/'N' to true/false
3. A way to get the executing user id
4. A way to transform any[][] into a typed response
5. Typed responses

## What does this expose
1. Typed Requests
2. Typed Responses
3. Typed Services

## What does a Service Factory look like?
`ServiceFactory<T>(schema: string): Observable<T>;`
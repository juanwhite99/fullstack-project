# FullstackProjectAngular

Installing Apollo-Angular
https://github.com/kamilkisiela/apollo-angular
```
npm i @apollo/client
npm i graphql
```

Adding angular modules and components
```
ng g m components/pages/home/home -m=app --route home --flat
ng g m shared/components/header
ng g c shared/components/header

ng g m components/pages/episodes/episodes -m=app --route episodes --flat
ng g m components/pages/notFount -m=app --route not

ng g m components/pages/characters/characters-card
ng g c components/pages/characters/characters-card

ng g m components/pages/characters/characters-list -m=app --route character-list
ng g m components/pages/characters/characters-details -m=app --route character-details

ng g m components/pages/about -m=app --route about
```

Adding angular services
```
ng g s shared/services/data
ng g s shared/services/localStorage
```

Other features
- https://github.com/scttcper/ngx-toastr
- https://github.com/orizens/ngx-infinite-scroll
```
npm i ngx-toastr
npm i ngx-infinite-scroll@14.0.0
```

Notes:
- https://www.azurestaticwebapps.dev/blog/configuring-swa

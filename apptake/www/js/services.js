app.factory('Profile', function ($resource) {
    return $resource('http://localhost:3000/api/profiles/:profileId');
});

export const getRestaurantData = () => {
    const requestOptions = {
        method: 'GET',
        headers : {'content-type' : 'application/json', 'Accept' : 'application/json'}
    }

    const url = new URL('https://66988ec62069c438cd6f1af8.mockapi.io/api/restaurantlist/RestaurantData');
    // url.searchParams.append('completed', false);
    // url.searchParams.append('page', 1);
    // url.searchParams.append('limit', 10);

    // const url = "https://66988ec62069c438cd6f1af8.mockapi.io/api/restaurantlist/RestaurantData";

    return fetch(`${url}`, requestOptions)
        .then( async (response) => {
            if(response.ok){
                return response.json()
            }
            return Promise.reject(response);
        })
        .then((response) => {
            if(response){
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            if(error){
                return Promise.reject(error)
            }
        });
}

export const addRestaurantData = (data) => {
    const requestOptions = {
        method: 'POST',
        headers : {'content-type' : 'application/json', 'Accept' : 'application/json'},
        body: JSON.stringify(data)
    }

    const url = new URL('https://66988ec62069c438cd6f1af8.mockapi.io/api/restaurantlist/RestaurantData');

    return fetch(`${url}`, requestOptions)
        .then( async (response) => {
            if(response.ok){
                return response.json()
            }
            return Promise.reject(response);
        })
        .then((response) => {
            if(response){
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            if(error){
                return Promise.reject(error)
            }
        });
}

export const updateRestaurantData = (data, id) => {
    const requestOptions = {
        method: 'PUT',
        headers : {'content-type' : 'application/json', 'Accept' : 'application/json'},
        body: JSON.stringify(data)
    }

    const url = new URL(`https://66988ec62069c438cd6f1af8.mockapi.io/api/restaurantlist/RestaurantData/${id}`);

    return fetch(`${url}`, requestOptions)
        .then( async (response) => {
            if(response.ok){
                return response.json()
            }
            return Promise.reject(response);
        })
        .then((response) => {
            if(response){
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            if(error){
                return Promise.reject(error)
            }
        });
}

export const deleteRestaurantData = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers : {'content-type' : 'application/json', 'Accept' : 'application/json'}
    }

    const url = new URL(`https://66988ec62069c438cd6f1af8.mockapi.io/api/restaurantlist/RestaurantData/${id}`);
    
    return fetch(`${url}`, requestOptions)
        .then( async (response) => {
            if(response.ok){
                return response.json()
            }
            return Promise.reject(response);
        })
        .then((response) => {
            if(response){
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            if(error){
                return Promise.reject(error)
            }
        });
}
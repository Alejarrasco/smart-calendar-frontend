<template>
    <h3>Press this button to test a request to the API</h3>
    <button @click="callapi()">Press Me</button>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const { getAccessTokenSilently } = useAuth0();
        const auth0 = useAuth0();

        return {
            doSomeThingWithToken: async () => {
                const token = await getAccessTokenSilently();
                console.log("Llamando al endpoint protegido");
                //console.log(auth0.user);
                const response = await fetch('http://localhost:8080/api/v1/protected', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'User-Agent': auth0.user._value.nickname,
                    },
                     body: JSON.stringify({
                        'name': auth0.user._value.nickname
                    }), 
                    method: 'POST'});
                
                console.log(await response.json());
            
            }
        }
    },
    methods: {
        callapi() {
            this.doSomeThingWithToken();
        }
    } 
}

</script>
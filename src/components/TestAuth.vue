<template>
    <button>Press Me</button>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const { getAccessTokenSilently } = useAuth0();

        return {
            doSomeThingWithToken: async () => {
                const token = await getAccessTokenSilently();
                const response = await fetch('http://localhost:8080/api/v1/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
    }
}
</script>
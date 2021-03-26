import axios from "axios";
import encoder from "@/common/encoder";

export default {
    getApiClient() {
        return axios
    },
    getEcho(encryptedClientString) {
        const client = this.getApiClient()
        let echoParams = {}
        echoParams["clientString"] = encryptedClientString
        let encodedPassword = encoder.getEncodedString("password")
        const headers = {
            'username': 'test user',
            'password': encodedPassword
        };

        const echoUrl = "http://localhost:8080/demo/echo"
        return client.get(echoUrl, {
            params: echoParams,
            headers: headers
        }).catch(error => {
            console.log(error)
            throw error
        })
    }
}
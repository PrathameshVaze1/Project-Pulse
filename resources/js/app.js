import './bootstrap';

import Alpine from 'alpinejs';
import axios from "axios";
import {startRegistration} from "@simplewebauthn/browser";

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('registerPasskey', () => ({
        async register(form) {
            const options = await axios.get('/api/passkeys/register');
            console.log(options);
            const passkey = await startRegistration(options.data);
            console.log(passkey);

            form.addEventListener('formData', ({ formData }) => {
                formData.set('passkey', JSON.stringify(passkey));
            });

            form.submit();
        },
    }));
});

Alpine.start();

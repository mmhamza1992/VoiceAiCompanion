// API Configuration - Essential and Working APIs
export const API_CONFIG = {
  // Email Configuration (SMTP)
  SMTP: {
    host: 'smtp.titan.email',
    port: 465,
    user: 'm@wakel.io',
    pass: 'Hamada12345@ge'
  },

  // WhatsApp Configuration (Twilio)
  TWILIO: {
    accountSid: 'AC7668f6f5192bc01d2c9b4cfdd8e39748',
    authToken: '6b69fb3b0bd3c6ee02a0f000d425ed5f',
    phoneNumber: '+12603052336'
  },

  // Google OAuth (for future use)
  GOOGLE: {
    clientId: '****************', // You'll need to provide the actual client ID
    clientSecret: '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'
  },

  // Google Sheets Service Account (for future use)
  GOOGLE_SHEETS: {
    projectId: 'n8nn-456312',
    clientEmail: 'replit@n8nn-456312.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeSnIRkVPCg1e0\n17AwHkyAx+dqI50kqAnRUwAitn344C8hVR1rWNbaxzIOatkTO6VGmmO5G8fVMd5a\n0uBaQ8NqyU+naHxxVrHsPOXxReRUO/lcAEWpH/d20o/pvu1erofZ1KPo2tEXj0H4\ngRByZTuE2XHIGReXwwEerpVUhqiJ4MV/zAdF+B1KfEKpw8RHgWpiWcFnUe6VHuWe\npm4Z6sAmqEN5XDp3IWv0wfICskofG1GF/IDjhMWgB8XR0ZZ1unxydS5U3jKOOXjX\nqtWGXMOen4yBn5pn7qSThLTyV9lW1cRFHzajdlYDgUdX2TLE5IyQcsJcH1k2LTP6\nCeSVyW8ZAgMBAAECggEAQteH/LAkMRbaggS0o1UgFB+WMqVQVerZnnmQrJfocSBl\n9orlLe/pZqBIHHt1KCB/ReWrJ7857uaskSjMUYGc8yqIRtah+hBUeMAsj2pmpUVg\nIsAAqo7Tpmr7F4cm4F0OA+e9wXYpZmv5vTDvG4dxD0PtPsSNyGmxvt2VNIjagcHs\n+CWZF4yfhXUnHQ9LLBQtuIdqZEefgpVDKV75RegjAFEgZ+3um+9Q5XMbwAaP1fBH\nDTrXPAu4dc57RcYx4uUc6iYImJ/9p3nQB8MpMVeZaNUt4Nk/Vmk85dv3BW+ZxzBU\nFvS5BLHclIxGeCHL+O2kEuDnJVvIZIhSkr0DdYA02wKBgQDWn/VzaZlRJmGxEUmD\nE1jDKKEsO1UPM2MvjiSPXXKCAlMtAjqOjwPpyg2A/M43TLDL31cuhQUKeNx19OW7\nBoEEtRF9IFGeo0PuCTKtpDKdnp9/JRoujsWTpC/p/qTdJ0byRM6DNeELsM6X48Nc\nNJ3DsxmmFzbWU6ZUPnv1MLPf0wKBgQC8zlJrbQ2/3EJNmm9T7X8WDEI6slE12j/d\nWrLmgyQnJCj5pl2ToojVRRdv9m0N++YAQ808zrmiQ7r16OfPAqcSoW47E4dvxt55\n7uBX6CbNVerCrZhXW3E3Y0ugcoL8yfujrWDBU9mEyB+yS0/OBM16xcv7SNOSGB8j\nmioSGPrN4wKBgGZZb76zDAcz64B6Qvk7/6dJt9qVDNIr6k/iVDL+GD5Bh5K+LliP\ngQk7bsclR939N45xmmy3yJie3FtwByHyTxKEmqt1/xZMu3dHcaB23iBmZZ9HfT3Y\nngXzVVocMli4g0/DWkweJIzjqxGp7x8IhHev8DpRdbgtufMQvSJHMHA7AoGAdqfn\nzlGb+X7QQHsVChbQ7qdHnCHivchqqI9OrWWve9XS1oqCdr0H55hjUV76THaJppL1\n0ghNS7frMI5t2IBfRWsknoX4cPv3Z4QDg9uHPzaGslBs1EHIljmWFsDAp2O8/LGC\nhB1RL4yhtuhzwBLunADg4Ax1wnPcZgCF/heqz2cCgYEAgmhuOuYchHnW0L6bhirA\n+v4UJERR9nxN8/1ptwVXHls9pPZwBbw3nPXLqzm0bs6v+Pt5JvcmBFUisTZ27cJ0\nf62aMbYbYugPArmIdgwGoipm6YGy0PJ4kzFYWNKk5/sJWCpvtXxn5wrdMkkihLSF\nK8oXGoPoWCB3a8Bn3RFbgAc=\n-----END PRIVATE KEY-----\n'
  },

  // Chatbase Bot (already working)
  CHATBASE: {
    iframeUrl: 'https://www.chatbase.co/chatbot-iframe/kHcJYDNgLO1E4FHxTh3Iy'
  }
};

// Helper function to get API config
export const getApiConfig = () => API_CONFIG;
const { GOOGLE_OAUTH2_AUTH_BASE_URL, OAuth2Client } = require("../../dist/google-oauth2.js");

describe("google-oauth2", function() {
    describe("OAuth2Client", function() {
        beforeEach(function() {
            this.client = new OAuth2Client("clientid", "clientsecret", "https://website.com");
            sinon.stub(this.client, "_request").returns(Promise.resolve({
                data: {
                    access_token: "at",
                    refresh_token: "rt",
                    expires_in: 300
                }
            }));
            this.authURLConfig = {
                access_type: "offline",
                scope: ["email", "profile"],
                prompt: "consent"
            };
        });

        describe("generateAuthUrl", function() {
            it("returns a URL with the correct prefix", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain(GOOGLE_OAUTH2_AUTH_BASE_URL);
            });

            it("includes the access type", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain("access_type=offline");
            });

            it("includes the scope", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain("scope=email%20profile");
            });

            it("includes the prompt", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain("prompt=consent");
            });

            it("includes the client ID", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain("client_id=clientid");
            });

            it("includes the redirect URL", function() {
                const url = this.client.generateAuthUrl(this.authURLConfig);
                expect(url).to.contain(`redirect_uri=${encodeURIComponent("https://website.com")}`);
            });
        });

        describe("exchangeAuthCodeForToken", function() {
            beforeEach(function() {
                this.tokensListener = sinon.spy();
                this.client.on("tokens", this.tokensListener);
                return this.client
                    .exchangeAuthCodeForToken("auth")
                    .then(result => {
                        this.result = result;
                    });
            });

            it("returns the tokens", function() {
                expect(this.result).to.have.property("tokens");
                expect(this.result.tokens).to.have.property("access_token", "at");
                expect(this.result.tokens).to.have.property("refresh_token", "rt");
            });

            it("emits an event with the tokens", function() {
                expect(this.tokensListener.callCount).to.equal(1);
                expect(this.tokensListener.firstCall.args[0]).to.have.property("access_token", "at");
                expect(this.tokensListener.firstCall.args[0]).to.have.property("refresh_token", "rt");
            });
        });

        describe("auth code decoding", function() {
            beforeEach(function() {
                sinon.spy(this.client, "exchangeAuthCodeForToken")
            })

            afterEach(function() {
                this.client.exchangeAuthCodeForToken.restore();
            })

            it("decodes auth code first before stringifying to be sent in request", function() {
                const authCode = "4%2FswEmlFcE4vP6BCXY_xmc4kUUgzB3uqB_b9uVLisqrr6-ADVVQEg7a6LojiIkyWq1JY4QhAGWbe5ektjTO";
                this.client.exchangeAuthCodeForToken(authCode);
                expect(this.client._request.getCall(0).args[0].body).to.include(authCode);
            })
        })
    });
});

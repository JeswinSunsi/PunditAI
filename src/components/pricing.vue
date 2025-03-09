<template>
    <div class="main" id="pricing">
        <h1 class="heading">Pricing</h1>
        <div class="main-wrapper">
            <div class="partition" style="margin-right: 1rem;">
                <h2 class="price">FREE</h2>
                <h1 class="amount">₹0.00<span style="font-weight: 400; font-size: 0.9rem;">/month</span></h1>
                <h3 class="point">Great for trying out Pundit AI & Users looking to explore the features</h3>
                <div class="btn">Start for Free</div>
                <div class="flex-wrapper">
                    <div class="line"></div>
                    <h3 class="features">FEATURES</h3>
                    <div class="line"></div>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Instant Access</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">3 Prompts Free</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Experience PRO for Free for 24 Hours</h3>
                </div>
            </div>
            <div class="partition">
                <h2 class="price">PRO</h2>
                <h1 class="amount">₹00.00<span style="font-weight: 400; font-size: 0.9rem;">/month</span></h1>
                <h3 class="point">Best for users ready to access Pundit AI's full feature-set</h3>
                <div class="btn">Coming Soon</div>
                <div class="flex-wrapper">
                    <div class="line"></div>
                    <h3 class="features">FEATURES</h3>
                    <div class="line"></div>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Full Access</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">50 Prompts / day</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">No Rate Limiting</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Instant File Download</h3>
                </div>
            </div>
            <div class="partition" style="margin-left: 1rem;">
                <h2 class="price">ENTERPRISE</h2>
                <h1 class="amount">₹00.00<span style="font-weight: 400; font-size: 0.9rem;">/month</span></h1>
                <h3 class="point">Best for researchers needing constant access to Pundit AI's entire feature-set</h3>
                <div class="btn">Coming Soon</div>
                <div class="flex-wrapper">
                    <div class="line"></div>
                    <h3 class="features">FEATURES</h3>
                    <div class="line"></div>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Unlimited Access</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Unlimited Prompts</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">No Rate Limiting</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Instant File Downloads</h3>
                </div>
                <div class="feature-wrapper">
                    <img src="../assets/check.png" alt="checkbox-ticked">
                    <h3 class="feature">Custom Chat Support</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.main {
    display: flex;
    padding: 0rem 8rem;
    margin-top: 2rem;
    font-family: Poppins;
    text-align: center;
    flex-direction: column;
}

.heading {
    font-weight: 600;
    font-size: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.main-wrapper {
    display: flex;
}

.feature-wrapper {
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
}

.feature-wrapper img {
    height: 1.3rem;
    margin-right: 0.5rem;
}

.flex-wrapper {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
}

.flex-wrapper h3 {
    margin: 0rem 0.5rem;
    color: rgba(19, 5, 64, 0.8);
    font-size: 0.8rem;
}

.line {
    width: 100%;
    height: 0.05rem;
    background-color: rgba(19, 5, 64, 0.8);
}

.btn {
    padding: 0.8rem 1rem;
    background-color: #130540;
    text-align: center;
    margin-top: 1.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: 0.3rem;
    color: aliceblue;
    cursor: pointer;
}

.partition {
    width: 50%;
    height: 72vh;
    border-radius: 0.75rem;
    border: 1px solid #13051f;
    padding: 2rem 1rem;
    background-color: #fff;
}

.price {
    font-size: 0.8rem;
    font-weight: 400;
}

.point {
    margin-top: 2rem;
    line-height: 1.3rem;
}

.amount {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 2rem;
}

@media only screen and (max-width: 740px) {
    .main-wrapper {
        display: flex;
        flex-direction: column;
    }

    .partition {
        height: 30rem;
        width: 100%;
        padding: 2rem 1rem;
        margin-left: 0rem !important;
        margin-bottom: 1.5rem;
    }

    .main {
        padding: 0rem 2rem;
    }
}
</style>
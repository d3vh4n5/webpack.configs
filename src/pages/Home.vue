<script setup>
    import TestComponent from '../components/TestComponent.vue'
    const envVar = process.env.API_URL

</script>
<template>
    <h1>Hola soy Home vue</h1>
    <p>
        Aquí hay una variable ed ambiente: <b>{{ envVar }}</b>
    </p>
    <TestComponent />
</template>
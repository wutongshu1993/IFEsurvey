<template>
   <!-- <div class="radio">
        <span>{{index}}</span><input type="text" class="h2">{{title}}
        &lt;!&ndash;<input type="radio"  v-for="option in options" :value="option">{{option}}&ndash;&gt;
    </div>-->

    <div class="radio">
        . <input type="text" :value="item.title" class="text">{{item.title}}
        <br>
        <template v-for="option in item.options">
            <input type="radio"   :value="option">{{option}}
        </template>
    </div>

</template>

<style>
    .h2{
        width:100%;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        border: none;
        margin-bottom: 20px;
    }
</style>
import { defineRule } from "vee-validate";
import { required, min, min_value, max_value, max } from "@vee-validate/rules";

export default defineNuxtPlugin((app) => {
    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
});


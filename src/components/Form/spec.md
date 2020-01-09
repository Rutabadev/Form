# Form spec

The user fills a form with username/password.

There are a lot of rules to make the password valid.

With each try (i.e. form submission), the following events occur:

- The password is evaluated.
- If he does not satisfy one rule, show it in red.
- Show only the last unsatisfied rule, do not show all of them that are not validated.
- Show a new unsatified rule only if all the seen ones are valid.
- If a rule has been shown before, she should be shown every next tries.
- Rule become green when valid.

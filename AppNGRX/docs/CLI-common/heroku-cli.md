# Show Logs
https://devcenter.heroku.com/categories/command-line

## Show Logs realtime
https://devcenter.heroku.com/articles/logging#runtime-logs

### Heroku Show Logs - RBAR
```ssh
heroku logs --tail --app tpf-integration-rbar
```
### Heroku Show Logs - MSO
```ssh
heroku logs --tail --app tpf-integration
```

**Commit Git on Heroku**

```ssh
git add .; git commit -m "update scope"; git push heroku HEAD:master;
```


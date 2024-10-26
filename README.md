# Consolidate Messages

If you naively trim the oldest messages from context, you'll have to rebuild the cache every message once you hit the context limit. This extension instead trims N messages at a time, so you only have to rebuild the cache every N messages. This won't work in group chats and neither if you use automatic summery creation, as these features cause the beginning of the context to change. You sacrifice being able to include as much messages as possible in the context, to gain improved inference speed. If you're able to run 32k Context length, you can get reasonably get away with only reevaluating the whole context every 15 messages or so, or even less frequently, depending on how much context length you are willing to sacrifice. 

## Install
Within SillyTavern, go to the extensions tab and click on "Install extension". Paste the following URL into the input field and click "Save"
```
 https://github.com/jfserv/SillyTavern-ConsolidateMessages
```

## Configuration

There is only one setting you can configure for this extension:

- Enabled
    - Enable or disable the extension


## Console output
This script dumps some Info into the console on each prompt send to the LLM backend:

- Consolidating messages, message count before: x
    - Number of Messages in the whole chat
- Consolidating messages, message count after: y 
    - Number of Messages after consolidation

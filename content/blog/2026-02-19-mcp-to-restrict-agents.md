---
title: "MCP to restrict agents"
description: "Use CLI tools over MCP for dev, but MCP has it place"
date: "2026-02-19"
author: "Jeroen Gordijn"
cover: "/images/mcp.png"
tags:
  - AI
  - Tools
  - Agents
---

Lately I was thinking about [MCPs](https://modelcontextprotocol.io) and what they are useful for. I stopped using them in my coding agents. But do they still have a purpose? For some time I didn't know, but when I started to think more about security and how to lock down agents, I think I found the answer.

# Development

When it came out, many developers hurried to put them in the Agent config. This led to context bloat and it is clear now that the Models we use can work very well without MCP. A [skill](https://agentskills.io) with a script works very well. For development, I think MCP is mostly nonsense. Your agent has bash access, so it can use all the CLI tools you have installed. These work very well. 

# Use of MCP

MCPs do serve a purpose when you want to lock down the agent that you are running. For instance, that email agent that should only be able to read mail and attach labels to them. You want to restrict the agent to only use the read mail, and the label mail tool. 

# The reasoning 

The moment you give an agent bash access, it can do anything. It can read files, write files, run commands, install tools, etc. In that case, use skills. If you want to restrict the agent to only use certain tools, you have to give it access to those tools and not give it bash access. This is mostly useful if you want to create an agent in an application.

MCP is actually a way to restrict what the agent can do. Use it to create a more secure agent, not to give it more power.

---
title: <% tp.file.title.split("-").map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ") %>
description: '<% tp.file.title.split("-").map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ") %> Description'
pubDate: <% tp.file.last_modified_date("MMM D YYYY") %>
heroImage: ../assets/<% tp.file.title %>.png
---

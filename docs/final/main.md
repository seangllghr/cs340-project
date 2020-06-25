---
author: Sean Gallagher
title: "Securities Tracking, Observation, and Computational Knowledge System:
        <br/>Documentation and Development Report"
short-title: "SDRS Documentation"
running-head: "SDRS DOCUMENTATION"
course: "CS-340: Client-Server Development"
university: Southern New Hampshire University
header-block: false
title-page: true
classic-title: true
bibliography: refs.bib
---

Professionals in the Financial Services sector must track and account for a
milieu of statistics and data in the course of the daily conduct of business.
Fortunately, computer systems present an opportunity to facilitate the
acquisition and analysis of this knowledge in new and compelling ways. The
Securities Tracking, Observation, and Computational Knowledge System[Yes, that's
quite a mouthful. We know; we're working on it.]{.footnote} is one such
system---one which aims to revolutionize the financial services sector. This
report documents the system, its features and functions, and the interface it
exposes to enable those ends. The system is built on Node.js in a modern Linux
operating environment, familiar to both administrators and engineering teams.
This allows developers to more flexibly move from back-end to front-end
development and focus on creating powerful, responsive interfaces for their
users.

This documentation consists of two sections. The first covers administration of
the system back end through the life cycle of included data. Following a
discussion of database initialization and indexing, the report will cover the
basic command line tools included with the product and their applications in
manipulating and validating the data stored within the installed system. The
second section details the Web Service API. This API---which is intended to be
the primary interface for both daily use and administration of the
system---includes endpoints for basic database manipulation and the two
specified reporting interfaces. Each section includes detailed descriptions of
operations involved in system administration, as well as screenshots
illustrating operations and their results. Names of variables, options, and
executable scripts or programs are set inline in `monospace`. Additionally,
commands meant to be entered directly at a Linux or MongoDB shell prompt follow
the convention:

    $ command [optional value] <mandatory value>

## Installing, Initializing, and Adminstering the System

The Securities Tracking, Observation, and Computational Knowledge System[We
really need a new name for this...]{.footnote} is built on MongoDB, a
document-oriented NoSQL database system, and Node.js, a server-side runtime for
modern JavaScript based on Google's V8 JavaScript engine. It is designed and
tested to run on modern Linux platforms---development and testing was done on
Ubuntu 20.04 LTS, though any recent Linux distribution should suffice. As a full
discussion of the pertinent concepts relating to each of these technologies
could fill several textbooks, this document assumes the prospective
administrator is familiar with installing and maintaining a Linux system;
installing, configuring, and securing a MongoDB server instance; and basic usage
of Node's `npm` package manager. Once these dependencies are met, issue the
following command to download the system files:

    $ git clone --depth 1 https://github.com/seangllghr/cs340-project

<p class="no-indent"> As with any `git clone` operation, you can specify a custom
installation directory at the end of the command. Once the files have been
downloaded, enter the installation directory and run</p>

    $ npm install

<p class="no-indent">to install the necessary Node dependencies.</p>
    
<!-- [Just call it STOCKS.]{.footnote} -->

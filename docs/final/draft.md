---
author: Sean Gallagher
title: "Securities Tracking, Observation, and Computational Knowledge System:"
subtitle: "System Documentation and Development Report"
short-title: "SDRS Documentation"
running-head: "SDRS DOCUMENTATION"
course: "CS-340: Client-Server Development"
university: Southern New Hampshire University
header-block: false
title-page: true
classic-title: true
bibliography: refs.bib
fontsize: 11pt
listings: true
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
illustrating operations and their results. Names of variables, options,
executable scripts or programs, and short commands meant to be entered at a
Linux or MongoDB shell prompt are set inline in `monospace`. Long commands,
especially those that extend across more than one line, will be set according to
the following convention:

\begin{lstlisting}
  > command [optional value] <mandatory value>
\end{lstlisting}

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

\begin{lstlisting}
  > git clone --depth 1 https://github.com/seangllghr/cs340-project
\end{lstlisting}

\noindent As with any `git clone` operation, you can specify a custom
installation directory at the end of the command. Once the files have been
downloaded, enter the installation directory and run `npm install` to
install the necessary Node dependencies

### System Initialization and Configuration

Once the system and its dependencies have been installed, the administrator
should seed the database with data. Seed data should take the form of JSON
securities data; while the specifics of the application will dictate the details
of the schema, the included utilities and API expect each stock to have the
following fields:

- `Ticker` (unique)
- `Sector`
- `Industry`
- `Volume`
- `50-Day Simple Moving Average`
- `Analyst Recom`

Figure [Fig] depicts the process of importing seed data into
the database instance using the `mongoimport` command. While the specific
construction of the command will depend on the environment and configuration of
the MongoDB server, the general form is:

\begin{lstlisting}[language=sh]
  mongoimport \
  [--host=<host>] [--port=<port>] \
  [authentication opts] \
  [--db=<db>] [--collection=<collection>] \
  <file>
\end{lstlisting}

<!-- [Just call it STOCKS.]{.footnote} -->

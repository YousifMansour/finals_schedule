# AUB Finals Schedule

This is a website that makes it easy to find the dates and location of your final exams, and view them in an orginized way using a calendar.

Because AUB puts out the finals in a pdf that contains more than 1200 entries, it can be difficult and annoying to search for one's courses; if not also error prone. This website aims to proivde a simple and elegent solution for this.

## How this works
So because AUB only provides a pdf file containing the finals, there is nothing else to work with. 
Using, pdf2json I convert the pdf into text. Then, a server parses all the information of all the exams and exposes an API for the client to query and retireve information from.

Project uses Angular 5 on the frontend and NodeJS (express) on the backend. It is hosted on Vultr.com.
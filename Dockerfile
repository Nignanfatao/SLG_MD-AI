FROM quay.io/astrofx011/fx-bot:latest
RUN npm install -g npm@latest
RUN git clone https://github.com/GEEKMDXINC/SLG_MD-AI .
RUN npm install
CMD ["npm", "start"]
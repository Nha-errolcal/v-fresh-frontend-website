FROM guergeiro/pnpm:22-10

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml* ./
COPY .npmrc* ./

RUN pnpm install

COPY . .

EXPOSE 5231

CMD ["pnpm", "dev", "--webpack"]
FROM guergeiro/pnpm:22-10

WORKDIR /app

<<<<<<< HEAD
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml* ./
COPY .npmrc* ./
=======
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
>>>>>>> da85ece325a714d6fba493dd8c06d6088981ed11

RUN pnpm install

COPY . .

<<<<<<< HEAD
EXPOSE 5231

=======
# Expose the port you want to use
EXPOSE 5231

# Pass the port flag directly to Next.js via pnpm
# CMD ["pnpm", "dev", "--port", "5231"]
>>>>>>> da85ece325a714d6fba493dd8c06d6088981ed11
CMD ["pnpm", "dev", "--webpack"]
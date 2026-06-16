FROM guergeiro/pnpm:22-10

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install

COPY . .

# Expose the port you want to use
EXPOSE 5231

# Pass the port flag directly to Next.js via pnpm
# CMD ["pnpm", "dev", "--port", "5231"]
CMD ["pnpm", "dev", "--webpack"]
up:
    docker run -d -p 3000:3000 --rm --name subredditshop subredditshop
down:
    docker stop subredditshop
build:
    docker build -t subredditshop .
rebuild:
    docker stop subredditshop
    docker build -t subredditshop .
    docker run -d -p 3000:3000 --rm --name subredditshop subredditshop
function-tests:
    npx vitest run
    
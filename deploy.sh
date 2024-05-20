echo "Switching to branch main"
git checkout main

echo "Building apps.."
pnpm run build

echo "Deploying.."
scp -r dist/* root@157.245.60.86:/var/www/157.245.60.86/

echo "Deploy Done!"
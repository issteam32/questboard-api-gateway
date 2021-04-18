# configure gcloud sdk
openssl aes-256-cbc -K $encrypted_9f3b5599b056_key -iv $encrypted_9f3b5599b056_iv -in service-account.json.enc -out service-account.json -d
curl https://sdk.cloud.google.com | bash > /dev/null;
source $HOME/google-cloud-sdk/path.bash.inc

# push docker image to registry
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_REPO/api-gateway:$GIT_SHA

#gcloud deploy cloud run
docker pull $DOCKER_REPO/api-gateway:$GIT_SHA

docker tag $DOCKER_REPO/api-gateway:$GIT_SHA gcr:io/$GCLOUD_PROJECT_ID/$DOCKER_REPO/api-gateway:$GIT_SHA

docker push gcr.io/$GCLOUD_PROJECT_ID/api-gateway:$GIT_SHA

gcloud run deploy --image=gcr.io/$GCLOUD_PROJECT_ID/api-gateway:$GIT_SHA --port=3000 --region=asia-southeast1-a --platform=managed
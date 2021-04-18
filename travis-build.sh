echo -e "[TRAVIS-BUILD-MESSAGE] --- running travis build ---"

docker build -t issteam32/api-gateway:latest -t issteam32/api-gateway:$GIT_SHA -f Dockerfile.prod .

echo "##############################################"
echo "# SHA value                                  #" 
echo "##############################################"
echo $GIT_SHA
echo "##############################################"

echo -e "[TRAVIS-BUILD-MESSAGE] --- done ---"
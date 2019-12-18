zip -r dist.zip ./dist

chmod 400 himadri.pem

scp -i himadri.pem ./dist.zip ubuntu@ec2-18-221-145-163.us-east-2.compute.amazonaws.com:/var/www/html/dev_backoffice

rm -rf dist.zip

ssh -i "himadri.pem" ubuntu@ec2-18-221-145-163.us-east-2.compute.amazonaws.com

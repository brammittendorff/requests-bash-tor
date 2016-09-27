#!/bin/bash

for i in {1..10000}
do
	nohup tor &
	sleep 2
	curl --proxy socks5://127.0.0.1:9050 http://www.icanhazip.com
	phantomjs --cookies-file=cookies.txt --proxy-type=socks5 --proxy=127.0.0.1:9050 screenshot.js http://www.eveoaks.com/
	# cleanup
	killall tor
done

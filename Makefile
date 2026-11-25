.PHONY: deploy

init:
	if [ -d "/tmp/book" ]; then \
		rm -rf /tmp/book; \
	fi
	git worktree add -f /tmp/book gh-pages

deploy: init
	@echo "====> deploying to github"
	mdbook build
	mkdir -p book/static/images
	cp -f src/static/join-us.html book/static/ || true
	cp -f src/static/images/wechat-qr.jpg src/static/images/douyin-qr.jpg book/static/images/ || true
	rm -rf /tmp/book/*
	cp -rp book/* /tmp/book/
	cd /tmp/book && \
		git add -A && \
		git commit -m "deployed on $(shell date) by ${USER}" && \
		git push -f origin gh-pages
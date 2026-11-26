.PHONY: deploy

init:
	if [ -d "/tmp/book" ]; then \
		rm -rf /tmp/book; \
	fi
	git worktree add -f /tmp/book gh-pages

deploy: init
	@echo "====> deploying to github"
	mdbook build
	mkdir -p book/static
	cp -f src/static/*.html book/static/ || true
	cp -R src/static/js src/static/css src/static/images book/static/ || true
	cp -f src/static/bible_full.js book/static/ 2>/dev/null || true
	rm -rf /tmp/book/*
	cp -rp book/* /tmp/book/
	cd /tmp/book && \
		git add -A && \
		git commit -m "deployed on $(shell date) by ${USER}" && \
		git push -f origin gh-pages
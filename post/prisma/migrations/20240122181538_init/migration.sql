-- CreateIndex
CREATE INDEX "idx_comment_post_id" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "idx_post_user_id" ON "Post"("userId");

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "postCreatorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "senderUsername" TEXT NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_post_user_id" ON "Notification"("postCreatorId");

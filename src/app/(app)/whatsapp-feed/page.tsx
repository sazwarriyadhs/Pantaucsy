
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { whatsappFeed } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { cn } from "@/lib/utils"

export default function WhatsappFeedPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('whatsappFeed.title')}</h1>
        <p className="text-muted-foreground">
          {t('whatsappFeed.description')}
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4 bg-secondary">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="Group Avatar" data-ai-hint="group people" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{t('whatsappFeed.chatTitle')}</CardTitle>
            <CardDescription className="text-xs">{t('whatsappFeed.onlineStatus')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4 bg-background">
            {whatsappFeed.map((msg, index) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2",
                  msg.isMe ? "justify-end" : "justify-start"
                )}
              >
                {!msg.isMe && whatsappFeed[index-1]?.sender !== msg.sender && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{msg.sender.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "flex flex-col",
                    msg.isMe ? "items-end" : "items-start",
                    !msg.isMe && whatsappFeed[index-1]?.sender === msg.sender && "ml-10"
                  )}
                >
                  {!msg.isMe && whatsappFeed[index-1]?.sender !== msg.sender && (
                    <p className="px-1 mb-1 text-xs font-semibold text-primary">{msg.sender}</p>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-xl max-w-sm",
                      msg.isMe
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    )}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={cn("text-xs mt-1 opacity-70", msg.isMe ? 'text-primary-foreground' : 'text-muted-foreground')}>{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
